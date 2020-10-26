import { Component, OnInit } from '@angular/core';
// import { take } from 'rxjs-compat/operator/take';
import {SharedService} from 'src/app/shared.service'
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private service: SharedService) { }

  QuotesList:any=[];

  ModalTitle:string;
  ActivateAddEditQuote:boolean=false;

  ActivateShowQuote:boolean=false;

  Quote:any;

  ngOnInit(): void {
    this.refreshQuotesList();
  }

  addClick(){
    this.Quote={
      quoteID:0,
      quote_Type:"",
      contact:"",
      task:"",
      due_Date:"",
      task_type:""
    }
    this.ModalTitle="Add New Task";
    this.ActivateAddEditQuote=true;
  }
  
  editClick(item){
    this.Quote=item;
    this.ModalTitle="Edit Task";
    this.ActivateAddEditQuote=true;

  }


  deleteClick(item){
    if(confirm('Are you sure??')){
      this.service.deleteQuotes(item).subscribe(data =>{
        alert("Delete success");
        this.refreshQuotesList();
      });
    }
  }

  closeClick(){
    this.ActivateAddEditQuote=false;
    this.refreshQuotesList();
  }


  viewClick(item){
    this.Quote=item;
    this. ActivateShowQuote=true;

  }

  closeClick2(){
    this.ActivateShowQuote=false;
    this.refreshQuotesList();
  }

  refreshQuotesList(){
    this.service.getQuotesList().subscribe(data=>{
      this.QuotesList=data;
    });
  }
}