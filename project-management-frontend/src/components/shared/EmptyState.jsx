import { FileX } from 'lucide-react';

export const EmptyState = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <FileX className="h-16 w-16 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 text-center max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};