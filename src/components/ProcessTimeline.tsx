import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

interface ProcessTimelineProps {
  steps?: TimelineStep[];
  currentStep?: number;
}

const ProcessTimeline = ({ steps = defaultSteps, currentStep = 0 }: ProcessTimelineProps) => {
  return (
    <div className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Grid layout for steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card
                  className={`h-full shadow-lg hover:shadow-xl transition-all border-2 overflow-hidden ${
                    isActive
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-white'
                      : isCompleted
                        ? 'border-green-300 bg-gradient-to-br from-green-50 to-white'
                        : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white'
                  }`}
                >
                  {/* Image header */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Step number */}
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          isCompleted
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : isActive
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                              : 'bg-gradient-to-r from-gray-500 to-gray-600'
                        }`}
                      >
                        {step.id}
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-sm text-gray-700">
                        <Clock className="h-3 w-3 mr-1" />
                        <span className="font-medium">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Process flow indicator */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index < currentStep
                    ? 'bg-green-500'
                    : index === currentStep
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 italic">
            Typical overall timeline: 3-6 weeks (ward-dependent)
          </p>
        </div>
      </div>
    </div>
  );
};

const defaultSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'Intake & KYC',
    description:
      'Share property details and verify your identity or appoint a local representative/POA.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    duration: '1-2 days'
  },
  {
    id: 2,
    title: 'Document Collection',
    description: 'We provide a scenario-specific checklist and quality check your document scans.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    duration: '3-5 days'
  },
  {
    id: 3,
    title: 'Portal Filing',
    description:
      'We complete online forms, structure uploads to pass file checks, and pay government fees.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    duration: '2-3 days'
  },
  {
    id: 4,
    title: 'On-ground Verification',
    description:
      'Our runner presents the file, answers queries, and obtains endorsements at the ward office.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    duration: '1-3 weeks'
  },
  {
    id: 5,
    title: 'Approval & Handover',
    description:
      'We download the e-Khata certificate, verify details, and deliver your final documentation package.',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    duration: '2-3 days'
  }
];

export default ProcessTimeline;
