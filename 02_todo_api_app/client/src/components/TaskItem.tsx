import React, { useState } from 'react';
import { Task, apiClient } from '@/api';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import EditTaskModal from './EditTaskModal';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const newStatus = checked ? 'completed' : 'not_completed';
      await apiClient.updateTask(task.id, { status: newStatus });
      onTaskUpdated({ ...task, status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот таск?')) {
      try {
        await apiClient.deleteTask(task.id);
        onTaskDeleted(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Checkbox
              checked={task.status === 'completed'}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="flex-1">
              <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                {task.name}
              </h3>
              {task.description && (
                <p className={`text-sm text-gray-600 mt-1 ${task.status === 'completed' ? 'line-through' : ''}`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {task.due_date && (
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(task.due_date)}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditModalOpen(true)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <EditTaskModal
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTaskUpdated={onTaskUpdated}
      />
    </>
  );
};

export default TaskItem;
