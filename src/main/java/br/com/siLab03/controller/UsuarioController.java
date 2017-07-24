package br.com.siLab03.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.siLab03.model.Serie;
import br.com.siLab03.model.Usuario;
import br.com.siLab03.service.SerieService;
import br.com.siLab03.service.UsuarioService;



@RestController
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private SerieService serieService;

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
		Usuario usuarioCadastrado = usuarioService.cadastrar(usuario);
		if (usuario == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(usuarioCadastrado, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ResponseEntity<Usuario> logar(@RequestBody Usuario usuario) {
		usuario = usuarioService.logar(usuario);
		if (usuario == null) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(usuario, HttpStatus.OK);
	}

	@RequestMapping(value = "/{usuarioID}/series", method = RequestMethod.GET)
	public ResponseEntity<List<Serie>> consultarSeries(@PathVariable Integer usuarioID) {
		List<Serie> series = serieService.seriesDoUsuario(usuarioID);
		return new ResponseEntity<>(series, HttpStatus.OK);
	}

}
