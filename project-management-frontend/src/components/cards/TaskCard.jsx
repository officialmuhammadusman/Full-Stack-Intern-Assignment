'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils/helpers';
import { TASK_STATUS_LABELS, TASK_STATUS_COLORS } from '@/lib/utils/constants';
import { useMembers } from '@/hooks/useMembers';
import { useAuth } from '@/hooks/useAuth';

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { getUserById } = useMembers();
  const { isAdmin } = useAuth();
  const assignedUser = getUserById(task.assigned_to);

  const handleStatusChange = (newStatus) => {
    if (onStatusChange) {
      onStatusChange(task.id, newStatus);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={TASK_STATUS_COLORS[task.status]}>
                {TASK_STATUS_LABELS[task.status]}
              </Badge>
            </div>
            <CardTitle className="text-lg text-foreground">{task.title}</CardTitle>
            <CardDescription className="mt-1 text-muted-foreground line-clamp-2">{task.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                Set as Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('in_progress')}>
                Set as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusChange('completed')}>
                Set as Completed
              </DropdownMenuItem>
              {isAdmin && (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Task
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete?.(task.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Task
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {formatDate(task.due_date)}</span>
          </div>
          {assignedUser && (
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs text-foreground">
                  {getInitials(assignedUser.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">{assignedUser.name}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};