import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface ServiceQuoteFormProps {
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  propertyAddress: string;
  scenario: string;
  deadline: string;
  additionalInfo: string;
}

const ServiceQuoteForm: React.FC<ServiceQuoteFormProps> = ({
  onSubmit = () => {},
  onCancel = () => {}
}) => {
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(25);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: 'United States', //
    propertyAddress: '',
    scenario: 'First-time', //
    deadline: '',
    additionalInfo: ''
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    setProgress(newStep * 25);
  };

  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    setProgress(newStep * 25);
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep = () => {
    return (
      <>
        <CardHeader className={cn('hidden', step === 1 && 'block')}>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Tell us about your Bengaluru property to help us understand your needs.
          </CardDescription>
        </CardHeader>

        <CardContent className={cn('space-y-4 hidden', step === 1 && 'block')}>
          <div className="space-y-2">
            <Label htmlFor="propertyAddress">Property Address</Label>
            <Textarea
              id="propertyAddress"
              name="propertyAddress"
              placeholder="Enter complete property address including ward number if known"
              value={formData.propertyAddress}
              onChange={(e) => handleChange('propertyAddress', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scenario">Service Scenario</Label>
            <Select
              value={formData.scenario}
              name="scenario"
              onValueChange={(value) => handleChange('scenario', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select scenario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First-time">First-time e-Khata</SelectItem>
                <SelectItem value="Sale">Transfer due to Sale</SelectItem>
                <SelectItem value="Gift">Transfer due to Gift</SelectItem>
                <SelectItem value="Inheritance">Transfer due to Inheritance</SelectItem>
                <SelectItem value="Court">Transfer due to Court Decree</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Any Deadlines?</Label>
            <Input
              id="deadline"
              name="deadline"
              placeholder="e.g., Need by September for tax filing"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
            />
          </div>
        </CardContent>

        <CardHeader className={cn('hidden', step === 2 && 'block')}>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Please provide your contact details so we can send you a quote.
          </CardDescription>
        </CardHeader>

        <CardContent className={cn('space-y-4 hidden', step === 2 && 'block')}>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <Input
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="Enter your WhatsApp number with country code"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country/Time Zone</Label>
            <Select
              name="country"
              value={formData.country}
              onValueChange={(value) => handleChange('country', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States (UTC-4 to UTC-7)</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom (UTC+1)</SelectItem>
                <SelectItem value="Singapore">Singapore (UTC+8)</SelectItem>
                <SelectItem value="Australia">Australia (UTC+8 to UTC+10)</SelectItem>
                <SelectItem value="UAE">UAE (UTC+4)</SelectItem>
                <SelectItem value="Canada">Canada (UTC-4 to UTC-7)</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardHeader className={cn('hidden', step === 3 && 'block')}>
          <CardTitle>Additional Information</CardTitle>
          <CardDescription>
            Any other details that might help us understand your case better.
          </CardDescription>
        </CardHeader>

        <CardContent className={cn('space-y-4 hidden', step === 3 && 'block')}>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Details</Label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              placeholder="Any specific requirements or questions?"
              value={formData.additionalInfo}
              onChange={(e) => handleChange('additionalInfo', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Do you have a local representative in Bengaluru?</Label>
            <RadioGroup defaultValue="no" name="rep">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="rep-yes" />
                <Label htmlFor="rep-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="rep-no" />
                <Label htmlFor="rep-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>

        <CardHeader className={cn('hidden', step === 4 && 'block')}>
          <CardTitle>Review & Submit</CardTitle>
          <CardDescription>Please review your information before submitting.</CardDescription>
        </CardHeader>

        <CardContent className={cn('space-y-4 hidden', step === 4 && 'block')}>
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Property Address:</p>
                <p className="text-sm">{formData.propertyAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Scenario:</p>
                <p className="text-sm">{formData.scenario}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Full Name:</p>
                <p className="text-sm">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email:</p>
                <p className="text-sm">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">WhatsApp:</p>
                <p className="text-sm">{formData.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Country:</p>
                <p className="text-sm">{formData.country}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4 bg-primary/5">
            <p className="text-sm">
              By submitting this form, you agree to be contacted by our team regarding your e-Khata
              service request. We'll send you a detailed quote based on your specific scenario.
            </p>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <Card className="w-full max-w-lg mx-auto bg-background">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (typeof (window as any).bdbForm === 'function') {
            (window as any).bdbForm(e, 'CONTACT_US', {
              type: '',
              value: 'CONTACT_US'
            });
          }

          handleSubmit();
        }}
        id="bdb-main-form"
      >
        <div className="p-4">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 text-center text-sm text-muted-foreground">Step {step} of 4</div>
        </div>

        {renderStep()}

        <CardFooter className="flex justify-between border-t p-4">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={prevStep}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextStep();
              }}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">
              Submit <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default ServiceQuoteForm;
