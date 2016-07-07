import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, ElementRef } from '@angular/core';
import { AbstractComponent } from './dnd.component';
import { DragDropConfig } from './dnd.config';
import { DragDropService } from './dnd.service';
export declare class DraggableComponent extends AbstractComponent {
    draggable: boolean;
    /**
     * The data that has to be dragged. It can be any JS object
     */
    dragData: any;
    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    onDragSuccessCallback: EventEmitter<any>;
    dropzones: Array<string>;
    /**
     * Drag allowed effect
     */
    effectallowed: string;
    /**
     * Drag effect cursor
     */
    effectcursor: string;
    constructor(elemRef: ElementRef, dragDropService: DragDropService, config: DragDropConfig, cdr: ChangeDetectorRef);
    _onDragStartCallback(event: Event): void;
    _onDragEndCallback(event: Event): void;
}
