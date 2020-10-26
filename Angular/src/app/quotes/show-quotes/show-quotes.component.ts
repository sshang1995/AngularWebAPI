import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
@Component({
  selector: 'app-show-quotes',
  templateUrl: './show-quotes.component.html',
  styleUrls: ['./show-quotes.component.css']
})
export class ShowQuotesComponent implements OnInit {

  constructor(private service:SharedService) { }
  
    @Input() Quote:any;
    quoteID:string;
    quote_Type:string;
    contact:string;
    task:string;
    due_Date:Date;
    task_type:string
  
    ngOnInit(): void {
      this.quoteID=this.Quote.quoteID;
      this.quote_Type=this.Quote.quote_Type;
      this.contact=this.Quote.contact;
      this.task=this.Quote.task;
      this.due_Date=this.Quote.due_Date;
      this.task_type=this.Quote.task_type
    }

    
  getQuote(){
    var q ={
      quoteID:this.quoteID,
      quote_Type:this.quote_Type,
      contact:this.contact,
      task:this.task,
      due_Date:this.due_Date,
      task_type:this.task_type

    }
    this.service.getQuote(q.quoteID).subscribe(res=>{
      alert("detail information");
    });

  }
}
