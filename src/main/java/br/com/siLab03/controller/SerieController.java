package br.com.siLab03.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.siLab03.model.Serie;
import br.com.siLab03.service.SerieService;



@RestController
@RequestMapping("/serie")
public class SerieController {
	
	@Autowired
	private SerieService serieService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<Serie> adicionar(@RequestBody Serie serie) {
		Serie serieAdicionada = serieService.adicionar(serie);
		return new ResponseEntity<>(serieAdicionada, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{serieID}", method = RequestMethod.DELETE)
	public ResponseEntity<Serie> remover(@PathVariable Integer serieID) {
		Serie serieRemovida = serieService.excluir(serieID);
		return new ResponseEntity<>(serieRemovida, HttpStatus.OK);
	}

	@RequestMapping(value = "/{serieID}", method = RequestMethod.PUT)
	public ResponseEntity<Serie> atualizar(@RequestBody Serie serie, @PathVariable Integer serieID) {
		serie.setId(serieID);
		Serie serieAtualizada = serieService.atualizar(serie);
		return new ResponseEntity<>(serieAtualizada, HttpStatus.OK);
	}

}
