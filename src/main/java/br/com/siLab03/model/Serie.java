package br.com.siLab03.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Serie {

	@Id
	@GeneratedValue
	private Integer id;

	private String imdbID;

	private String avaliacao;

	private String ultimoEpisodio;

	private Integer usuarioID;

	private boolean noPerfil;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getImdbID() {
		return imdbID;
	}

	public void setImdbID(String imdbID) {
		this.imdbID = imdbID;
	}

	public String getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(String avaliacao) {
		this.avaliacao = avaliacao;
	}

	public String getUltimoEpisodio() {
		return ultimoEpisodio;
	}

	public void setUltimoEpisodio(String ultimoEpisodio) {
		this.ultimoEpisodio = ultimoEpisodio;
	}

	public Integer getUsuarioID() {
		return usuarioID;
	}

	public void setUsuarioID(Integer usuarioID) {
		this.usuarioID = usuarioID;
	}

	public boolean isNoPerfil() {
		return noPerfil;
	}

	public void setNoPerfil(boolean noPerfil) {
		this.noPerfil = noPerfil;
	}


}
