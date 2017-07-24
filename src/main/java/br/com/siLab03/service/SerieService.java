package br.com.siLab03.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.siLab03.model.Serie;
import br.com.siLab03.repository.SerieRepository;


@Service
public class SerieService {
	@Autowired
	private SerieRepository serieRepository;
	
	public Serie adicionar(Serie serie) {
		return serieRepository.save(serie);
	}
	
	public Serie atualizar(Serie serie) {
		return serieRepository.save(serie);
	}
	
	public Serie excluir(Serie serie) {
		serieRepository.delete(serie);
		return serie;
	}
	
	public Serie excluir(Integer serieID) {
		Serie serie = getSerie(serieID);
		serieRepository.delete(serie);
		return serie;
	}
	
	public Serie getSerie(Integer serieID) {
		return serieRepository.findOne(serieID);
	}
	
	public List<Serie> getSeries() {
		return serieRepository.findAll();
	}
	
	public List<Serie> seriesDoUsuario(Integer usuarioID) {
		List<Serie> series = getSeries();
		List<Serie> seriesDoUsuario = new ArrayList<Serie>();
		for(Serie serie : series) {
			if (serie.getUsuarioID().equals(usuarioID)) {
				seriesDoUsuario.add(serie);
			}
		}
		return seriesDoUsuario;
	}
	
	public boolean usuarioPossuiSerie(Integer usuarioID, Integer serieID) {
		List<Serie> seriesDoUsuario = seriesDoUsuario(usuarioID);
		Serie seriePesquisada = getSerie(serieID);
		return seriesDoUsuario.contains(seriePesquisada);
	}

}
