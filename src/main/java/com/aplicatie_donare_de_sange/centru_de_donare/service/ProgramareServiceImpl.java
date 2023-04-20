package com.aplicatie_donare_de_sange.centru_de_donare.service;

import com.aplicatie_donare_de_sange.centru_de_donare.Dto.ProgramareDto;
import com.aplicatie_donare_de_sange.centru_de_donare.Model.Donator;
import com.aplicatie_donare_de_sange.centru_de_donare.Model.Locatie;
import com.aplicatie_donare_de_sange.centru_de_donare.Model.Programare;
import com.aplicatie_donare_de_sange.centru_de_donare.Repository.DonatorRepository;
import com.aplicatie_donare_de_sange.centru_de_donare.Repository.LocatieRepository;
import com.aplicatie_donare_de_sange.centru_de_donare.Repository.ProgramareRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProgramareServiceImpl implements ProgramareService {

    private ProgramareRepository programareRepository;
    private LocatieRepository locatieRepository;
    private DonatorRepository donatorRepository;

    public ProgramareServiceImpl(ProgramareRepository programareRepository, LocatieRepository locatieRepository, DonatorRepository donatorRepository){

        this.programareRepository = programareRepository;
        this.locatieRepository = locatieRepository;
        this.donatorRepository = donatorRepository;

    }

    @Override
    public Programare saveProgramare(ProgramareDto programareDto) {

        Donator donator = donatorRepository.getOne(Long.parseLong(programareDto.getDonatorId()));
        Locatie locatie = locatieRepository.getOne(Long.parseLong(programareDto.getLocatieId()));

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date date = null;
        try {
            date = dateFormat.parse(programareDto.getDate());
        } catch (ParseException e) {

            System.out.println("Data de parsat este invalida");

            e.printStackTrace();
        }

        Programare programare = new Programare(date , locatie , donator);

        return programareRepository.save(programare);
    }

    @Override
    public List<Programare> getChechedProgramari(Long id) {

      return  programareRepository.findAll().stream().filter(programare -> programare.getDonator().getId() == id && programare.isStatus() && !programare.isAnulata()).collect(Collectors.toList());
    }

    @Override
    public List<Programare> getUncheckedProgramari(Long id) {
      return programareRepository.findAll().stream().filter(programare -> !programare.isAnulata()).collect(Collectors.toList());

    }

    @Override
    public List<Programare> getProgramariFromLocation(Long idLocatie) {
        return programareRepository.findAll().stream().filter(programare -> programare.getLocatie().getId() == idLocatie && (!programare.isAnulata() && programare.isStatus())).collect(Collectors.toList());
    }

    @Override
    public List<Programare> allProgramari() {
        return programareRepository.findAll().stream().filter(programare ->  (!programare.isAnulata() && programare.isStatus())).collect(Collectors.toList());
    }

    @Override
    public List<Programare> getProgramariDonator(Donator donator) {
        return programareRepository.findAll().stream().filter(programare -> programare.getDonator().getId() == donator.getId()).collect(Collectors.toList());
    }

    @Override
    public void anuleaza(Long id) {

        Programare lastProgramare = programareRepository.getOne(id);
        lastProgramare.setAnulata(true);
        programareRepository.save(lastProgramare);

    }

    @Override
    public void finalizeaza(Long id) {
        Programare lastProgramare = programareRepository.getOne(id);
        lastProgramare.setStatus(false);
        programareRepository.save(lastProgramare);
    }


}
