import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'origin',
    templateUrl: 'origin.component.html'
})
export class OriginComponent implements AfterViewInit, OnInit {
    private remoteElement: Window;
    public message: string;
    
    constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        
     }

    ngOnInit() { }
    ngAfterViewInit() {
        window.addEventListener('message', (e) => this.onMessageReceived(e));
        console.log('origin  is ready');
        // setTimeout(()=>{this.remoteElement.postMessage('Hello from origin', 'http://localhost:3000')}, 10000)
    }
    
    private onMessageReceived(e: MessageEvent) {
        console.log('origin received a message ', e.data);
        this.remoteElement = (<HTMLIFrameElement>$(this.elementRef.nativeElement).find('iframe')[0]).contentWindow;
        
        if (e.origin === 'http://localhost:3000') {
            if (!this.message) {
                this.message = e.data;
                console.info('origin sending message from onMessage');
                this.remoteElement.postMessage('Hello from origin onMessage', '*');
                this.changeDetectorRef.detectChanges();
            }   
        }
    }

}