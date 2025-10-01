'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Shield } from 'lucide-react';
import { getInitials } from '@/lib/utils/helpers';

export const MemberCard = ({ member }) => {
  const isAdmin = member.role === 'admin';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="text-lg text-foreground">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
              {isAdmin && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Shield className="h-3 w-3" />
                  <span>Admin</span>
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span className="truncate">{member.email}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};