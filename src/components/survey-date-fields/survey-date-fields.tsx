"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SurveyDateFieldsProps = {
  focusClassName: string;

  dataInicio: string;
  onDataInicioChange: (value: string) => void;

  dataFim: string;
  onDataFimChange: (value: string) => void;
};

export function SurveyDateFields({
  focusClassName,
  dataInicio,
  onDataInicioChange,
  dataFim,
  onDataFimChange,
}: SurveyDateFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="dataInicio">
          Data de início <span className="text-red-500">*</span>
        </Label>
        <Input
          id="dataInicio"
          type="date"
          className={focusClassName}
          value={dataInicio}
          onChange={(e) => onDataInicioChange(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="dataFim">Data de fim</Label>
        <Input
          id="dataFim"
          type="date"
          className={focusClassName}
          value={dataFim}
          onChange={(e) => onDataFimChange(e.target.value)}
        />
      </div>
    </div>
  );
}
