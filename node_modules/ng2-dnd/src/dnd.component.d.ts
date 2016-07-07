import { ChangeDetectorRef } from '@angular/core';
import { ElementRef } from '@angular/core';
import { DragDropConfig } from './dnd.config';
import { DragDropService } from './dnd.service';
export declare abstract class AbstractComponent {
    _dragDropService: DragDropService;
    _config: DragDropConfig;
    private _cdr;
    _elem: HTMLElement;
    _defaultCursor: string;
    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled;
    dragEnabled: boolean;
    /**
     * Allows drop on this element
     */
    dropEnabled: boolean;
    /**
     * Drag effect
     */
    effectAllowed: string;
    /**
     * Drag cursor
     */
    effectCursor: string;
    /**
     * Restrict places where a draggable element can be dropped. Either one of
     * these two mechanisms can be used:
     *
     * - dropZones: an array of strings that permits to specify the drop zones
     *   associated with this component. By default, if the drop-zones attribute
     *   is not specified, the droppable component accepts drop operations by
     *   all the draggable components that do not specify the allowed-drop-zones
     *
     * - allowDrop: a boolean function for droppable components, that is checked
     *   when an item is dragged. The function is passed the dragData of this
     *   item.
     *   - if it returns true, the item can be dropped in this component
     *   - if it returns false, the item cannot be dropped here
     */
    allowDrop: (dropData: any) => boolean;
    dropZones: string[];
    constructor(elemRef: ElementRef, _dragDropService: DragDropService, _config: DragDropConfig, _cdr: ChangeDetectorRef);
    /******* Change detection ******/
    detectChanges(): void;
    private _onDragEnter(event);
    private _onDragOver(event);
    private _onDragLeave(event);
    private _onDrop(event);
    private _isDropAllowed;
    private _onDragStart(event);
    private _onDragEnd(event);
    _onDragEnterCallback(event: Event): void;
    _onDragOverCallback(event: Event): void;
    _onDragLeaveCallback(event: Event): void;
    _onDropCallback(event: Event): void;
    _onDragStartCallback(event: Event): void;
    _onDragEndCallback(event: Event): void;
}
