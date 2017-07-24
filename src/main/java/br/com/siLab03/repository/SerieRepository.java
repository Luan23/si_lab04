package br.com.siLab03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.siLab03.model.Serie;

@Repository
public interface SerieRepository extends JpaRepository<Serie, Integer> {

}
