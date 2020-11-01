import { Component, OnInit } from '@angular/core';
// import { take } from 'rxjs-compat/operator/take';
import {SharedService} from 'src/app/shared.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  constructor(private service: SharedService, private route:Router) { }

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
    //close click for view button
    this.ActivateShowQuote=false;
    this.refreshQuotesList();
  }

  // sort(prop:string){
  //   //sorter service will handle the sorting
  // }

  LogoutClick(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('token_type');
    this.route.navigate(['/login']);
  }

  filter(data: string){
    if(data){
      this.QuotesList = this.QuotesList.filter((Quote)=>{
        return Quote.contact.indexOf(data) >-1 ||
                Quote.task_type.indexOf(data) >-1 ||
                Quote.due_Date.indexOf(data) >-1;
                
      });

    }else {
      this.refreshQuotesList();
    }
  }

  refreshQuotesList(){
    this.service.getQuotesList().subscribe(data=>{
      this.QuotesList=data;
    });
  }
}
