"use client";

import React from "react";

type SurveyStepperProps = {
  /** Etapa atual (1, 2 ou 3) */
  currentStep: 1 | 2 | 3;
};

const steps = [
  { step: 1, label: "Configuração" },
  { step: 2, label: "Perguntas" },
  { step: 3, label: "Disponibilizar" },
];

export default function SurveyStepper({ currentStep }: SurveyStepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full">
        {steps.map((item, index, arr) => {
          const isCompleted = item.step < currentStep;
          const isCurrent = item.step === currentStep;

          const circleClasses = (() => {
            if (isCurrent) {
              return "border-black bg-black text-white";
            }
            if (isCompleted) {
              return "border-[#21C25E] bg-[#21C25E] text-white";
            }
            return "border-zinc-300 text-zinc-700";
          })();

          return (
            <div key={item.step} className="flex-1 flex items-center">
              {/* linha esquerda */}
              {index !== 0 && <div className="h-px bg-zinc-300 flex-1" />}

              {/* círculo + label (alinhados verticalmente) */}
              <div className="mx-3 shrink-0 flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium ${circleClasses}`}
                >
                  {item.step}
                </div>
                <span className="mt-1 text-xs font-medium text-zinc-800 text-center whitespace-nowrap">
                  {item.label}
                </span>
              </div>

              {/* linha direita */}
              {index !== arr.length - 1 && (
                <div className="h-px bg-zinc-300 flex-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
