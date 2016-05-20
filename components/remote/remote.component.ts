import { AfterViewInit, Component, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import $ = require("jquery");


@Component({
    moduleId: module.id,
    selector: 'remote',
    templateUrl: 'remote.component.html'
})
export class RemoteComponent implements OnInit, AfterViewInit {
    public message: string;
    
    constructor(private changeDetectorRef: ChangeDetectorRef) { 
    }

    ngOnInit() { }
    ngAfterViewInit() {
        setTimeout(()=> {
        console.log('remote is ready');
        window.addEventListener('message', (e)=>{
            this.onMessageReceived(e);
        });
        console.info('remote sending message to parent');
        parent.postMessage('Remote says parent.hello', 'http://localhost:3000');
        console.info('remote sending message to top');
        top.postMessage('Remote says top.hello', 'http://localhost:3000');    
        }, 4000);
        
    }
    
    private onMessageReceived(e: MessageEvent) {
        console.log('remote got a messsage ', e.data, e.origin);
        if (e.origin === 'http://localhost:3000') {
            this.message = e.data;
            this.changeDetectorRef.detectChanges();
        }
    }
}