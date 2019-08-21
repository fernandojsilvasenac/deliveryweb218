import { ProdutosService } from './../shared/produtos.service';
import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../categorias/shared/categorias.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.css']
})
export class FormProdutosComponent implements OnInit {
  formProduto: FormGroup;
  key: string;
  categorias: Observable<any[]>;

  private file: File = null;
  imgUrl = '';
  filePath = '';
  result: void;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private categoriasService: CategoriasService,
                private produtosService: ProdutosService,
                private toastr: ToastrService,
                private router: Router
      ) { }

    ngOnInit() {
      this.criarFormulario();
      this.categorias = this.categoriasService.getAll();

      this.key = this.route.snapshot.paramMap.get('key');
      if (this.key) {
        const subscribe = this.produtosService.getByKey(this.key)
          .subscribe((produtos: any) => {

            subscribe.unsubscribe();
            this.formProduto.setValue({
              nome: produtos.nome,
              descricao: produtos.descricao,
              preco: produtos.preco,
              categoriaKey: produtos.categoriaKey,
              categoriaNome: produtos.categoriaNome,
              img: ''
            });

            this.imgUrl = produtos.img || '';
            this.filePath = produtos.filePath || '';

          });
      }

    }

    get nome() { return this.formProduto.get('nome'); }
    get descricao() { return this.formProduto.get('descricao'); }
    get preco() { return this.formProduto.get('preco'); }
    get categoriaKey() { return this.formProduto.get('categoriaKey'); }
    get categoriaNome() { return this.formProduto.get('categoriaNome'); }


    criarFormulario() {
      this.key = null;
      this.formProduto = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: [''],
        preco: ['', Validators.required],
        categoriaKey: ['', Validators.required],
        categoriaNome: [''],
        img: ['']
      });

      this.file = null;
      this.imgUrl = '';
      this.filePath = '';
    }


    setCategoriaNome(categorias: any) {
      if (categorias && this.formProduto.value.categoriaKey) {
        const categoriaNome = categorias[0].text;
        this.categoriaNome.setValue(categoriaNome);
      } else {
        this.categoriaNome.setValue('');
      }
    }

    upload(event: any) {
      if (event.target.files.length) {
        this.file = event.target.files[0];
      } else {
        this.file = null;
      }
    }

    removerImg() {
      this.produtosService.removeImg(this.filePath, this.key);
      this.imgUrl = '';
      this.filePath = '';
    }

    onSubmit() {
      if (this.formProduto.valid) {
        let result: Promise<{}>;

        if (this.key) {
          result = this.produtosService.update(this.formProduto.value, this.key);
        } else {
          result = this.produtosService.insert(this.formProduto.value);
        }

        if (this.file) {
          result.then( (key: string) => {
            this.produtosService.uploadImg(key, this.file);
            this.criarFormulario();
          });
        } else {
          this.criarFormulario();
        }

        this.router.navigate(['produtos']);
        this.toastr.success('Produtos salvo com sucesso!!!');
      }
    }

}
