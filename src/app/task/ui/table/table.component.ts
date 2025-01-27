import { Component, effect, EventEmitter, input, output, Output } from '@angular/core'
import { Task } from '../../data-access/task.service'
import { RouterLink } from '@angular/router'

@Component({
	selector: 'app-table',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './table.component.html',
	styles: ``
})
export class TableComponent {
	tasks = input.required<Task[]>()
	// @Output() deleteTask = new EventEmitter<string>()
	deleteTask = output<string>()

	constructor() {}

	onDelete(id: string) {
		this.deleteTask.emit(id)
	}
}
