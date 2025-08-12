import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, HttpClientModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent implements OnInit {
  jogos: any[] = [];
  jogo: any = { nome: '', genero: '', ano: null };
  editando: boolean = false;
  editIndex: number | null = null;
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3012/api/jogos';

  ngOnInit() {
    this.buscarJogos();
  }

  buscarJogos() {
    this.http.get<any[]>(this.apiUrl).subscribe(jogos => {
      this.jogos = jogos;
    });
  }

  salvar() {
    if (this.editando && this.editIndex !== null && this.jogo.id) {
      // Atualizar
      this.http.put(`${this.apiUrl}/${this.jogo.id}`, this.jogo).subscribe(() => {
        this.jogos[this.editIndex!] = { ...this.jogo };
        this.cancelarEdicao();
      });
    } else {
      // Criar
      this.http.post<any>(this.apiUrl, this.jogo).subscribe(jogoCriado => {
        this.jogos.push(jogoCriado);
        this.jogo = { nome: '', genero: '', ano: null };
      });
    }
  }

  editar(jogo: any, i: number) {
    this.jogo = { ...jogo };
    this.editando = true;
    this.editIndex = i;
  }

  excluir(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.jogos = this.jogos.filter(j => j.id !== id);
      if (this.editando && this.jogo.id === id) {
        this.cancelarEdicao();
      }
    });
  }

  cancelarEdicao() {
    this.editando = false;
    this.jogo = { nome: '', genero: '', ano: null };
    this.editIndex = null;
  }
}
