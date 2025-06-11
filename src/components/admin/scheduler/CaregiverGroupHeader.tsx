
import React from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CaregiverGroupHeaderProps {
  region: string;
  caregiverCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

const CaregiverGroupHeader: React.FC<CaregiverGroupHeaderProps> = ({
  region,
  caregiverCount,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="bg-muted/30 border-b border-border sticky top-0 z-10">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-primary" />
        ) : (
          <ChevronRight className="w-4 h-4 text-primary" />
        )}
        <Users className="w-4 h-4 text-primary" />
        <span className="font-semibold text-foreground">{region} Region</span>
        <Badge variant="secondary" className="ml-auto">
          {caregiverCount} caregivers
        </Badge>
      </button>
    </div>
  );
};

export default CaregiverGroupHeader;
