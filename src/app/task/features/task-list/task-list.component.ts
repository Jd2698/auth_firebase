import { Component, inject } from '@angular/core'
import { TableComponent } from '../../ui/table/table.component'
import { RouterLink } from '@angular/router'
import { TaskService } from '../../data-access/task.service'
import { toast } from 'ngx-sonner'

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [TableComponent, RouterLink],
	templateUrl: './task-list.component.html',
	styles: ``,
	providers: [TaskService]
})
export default class TaskListComponent {
	tasksService = inject(TaskService)

	async delete(taskId: string) {
		await this.tasksService.delete(taskId)
		toast('Successfully deleted')
	}
}
