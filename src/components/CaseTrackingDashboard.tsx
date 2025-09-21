import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  Clock,
  FileText,
  MapPin,
  Upload,
  AlertCircle,
  Download,
  Eye,
} from "lucide-react";

interface CaseTrackingDashboardProps {
  caseId?: string;
  status?: "pending" | "in-progress" | "completed" | "on-hold";
  progress?: number;
  documents?: DocumentItem[];
  activities?: ActivityItem[];
  payments?: PaymentItem[];
  verificationPhotos?: VerificationPhoto[];
}

interface DocumentItem {
  id: string;
  name: string;
  status: "pending" | "uploaded" | "verified" | "rejected";
  uploadedAt?: string;
  notes?: string;
}

interface ActivityItem {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
}

interface PaymentItem {
  id: string;
  date: string;
  amount: number;
  description: string;
  receiptUrl?: string;
}

interface VerificationPhoto {
  id: string;
  date: string;
  location: string;
  imageUrl: string;
  description: string;
}

const CaseTrackingDashboard: React.FC<CaseTrackingDashboardProps> = ({
  caseId = "EKHATA-2023-001",
  status = "in-progress",
  progress = 65,
  documents = defaultDocuments,
  activities = defaultActivities,
  payments = defaultPayments,
  verificationPhotos = defaultVerificationPhotos,
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "on-hold":
        return "bg-red-100 text-red-800";
      case "uploaded":
        return "bg-purple-100 text-purple-800";
      case "verified":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            e-Khata Application Dashboard
          </h1>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500 mr-2">
              Case ID: {caseId}
            </span>
            <Badge variant="outline" className={getStatusColor(status)}>
              {status === "in-progress"
                ? "In Progress"
                : status === "completed"
                  ? "Completed"
                  : status === "on-hold"
                    ? "On Hold"
                    : "Pending"}
            </Badge>
          </div>
        </div>
        <Button className="mt-4 md:mt-0">
          <Eye className="mr-2 h-4 w-4" /> Contact Case Manager
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Application Progress</CardTitle>
          <CardDescription>
            Current status of your e-Khata application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <StatusCard
                icon={<FileText className="h-5 w-5 text-blue-600" />}
                title="Document Verification"
                status="Completed"
                isActive={true}
              />
              <StatusCard
                icon={<Upload className="h-5 w-5 text-blue-600" />}
                title="Portal Filing"
                status="Completed"
                isActive={true}
              />
              <StatusCard
                icon={<MapPin className="h-5 w-5 text-blue-600" />}
                title="Ward Verification"
                status="In Progress"
                isActive={true}
              />
              <StatusCard
                icon={<CheckCircle className="h-5 w-5 text-gray-400" />}
                title="Certificate Issuance"
                status="Pending"
                isActive={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="verification">Verification Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Latest updates on your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="relative pl-6">
                      {index < activities.length - 1 && (
                        <div className="absolute left-2 top-3 h-full w-0.5 bg-gray-200" />
                      )}
                      <div className="absolute left-0 top-2 rounded-full bg-blue-500 p-1">
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          {activity.date}
                        </span>
                        <span className="font-medium">{activity.title}</span>
                        <p className="text-sm text-gray-600 mt-1">
                          {activity.description}
                        </p>
                        <Badge className="w-fit mt-2" variant="outline">
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
              <CardDescription>
                Required documents for your e-Khata application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-start justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 mr-2 text-gray-500" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      {doc.uploadedAt && (
                        <span className="text-xs text-gray-500 mt-1 block">
                          Uploaded on {doc.uploadedAt}
                        </span>
                      )}
                      {doc.notes && (
                        <p className="text-sm text-gray-600 mt-2">
                          {doc.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={`mb-2 ${getStatusColor(doc.status)}`}>
                        {doc.status === "pending"
                          ? "Pending"
                          : doc.status === "uploaded"
                            ? "Uploaded"
                            : doc.status === "verified"
                              ? "Verified"
                              : "Rejected"}
                      </Badge>
                      {doc.status === "pending" ? (
                        <Button size="sm" variant="outline">
                          <Upload className="h-4 w-4 mr-1" /> Upload
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" /> Upload Additional Documents
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Record of all payments related to your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{payment.description}</div>
                      <div className="text-sm text-gray-500">
                        {payment.date}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-4">
                        ₹{payment.amount.toLocaleString()}
                      </span>
                      {payment.receiptUrl && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" /> Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Photos</CardTitle>
              <CardDescription>
                Geo-tagged photos from on-ground verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="aspect-video relative">
                      <img
                        src={photo.imageUrl}
                        alt={photo.description}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="font-medium">{photo.description}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="h-3 w-3 mr-1" /> {photo.date}
                        <MapPin className="h-3 w-3 ml-3 mr-1" />{" "}
                        {photo.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatusCard = ({
  icon,
  title,
  status,
  isActive,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  isActive: boolean;
}) => {
  return (
    <div
      className={`p-4 rounded-lg border ${isActive ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"}`}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2 font-medium">{title}</span>
      </div>
      <div
        className={`text-sm mt-2 ${isActive ? "text-blue-700" : "text-gray-500"}`}
      >
        {status}
      </div>
    </div>
  );
};

// Default mock data
const defaultDocuments: DocumentItem[] = [
  {
    id: "1",
    name: "Sale Deed / Property Registration Document",
    status: "verified",
    uploadedAt: "15 May 2023",
    notes: "Document verified by BBMP portal",
  },
  {
    id: "2",
    name: "Encumbrance Certificate (EC)",
    status: "verified",
    uploadedAt: "15 May 2023",
  },
  {
    id: "3",
    name: "Latest Property Tax Receipt",
    status: "uploaded",
    uploadedAt: "16 May 2023",
    notes: "Awaiting verification",
  },
  {
    id: "4",
    name: "Passport Copy (ID Proof)",
    status: "verified",
    uploadedAt: "15 May 2023",
  },
  {
    id: "5",
    name: "Property Photographs",
    status: "pending",
  },
];

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    date: "18 May 2023, 10:30 AM",
    title: "Ward Office Visit Scheduled",
    description:
      "Our representative will visit the BBMP Ward Office for document verification on 20th May.",
    status: "in-progress",
  },
  {
    id: "2",
    date: "16 May 2023, 2:15 PM",
    title: "Portal Filing Completed",
    description:
      "All documents have been successfully uploaded to the BBMP e-Aasthi portal.",
    status: "completed",
  },
  {
    id: "3",
    date: "15 May 2023, 11:45 AM",
    title: "Document Verification",
    description: "Your submitted documents have been verified by our team.",
    status: "completed",
  },
  {
    id: "4",
    date: "12 May 2023, 9:20 AM",
    title: "Application Initiated",
    description: "Your e-Khata application process has been initiated.",
    status: "completed",
  },
];

const defaultPayments: PaymentItem[] = [
  {
    id: "1",
    date: "16 May 2023",
    amount: 5000,
    description: "BBMP Filing Fee",
    receiptUrl: "#",
  },
  {
    id: "2",
    date: "12 May 2023",
    amount: 15000,
    description: "Service Fee - e-Khata Processing",
    receiptUrl: "#",
  },
];

const defaultVerificationPhotos: VerificationPhoto[] = [
  {
    id: "1",
    date: "18 May 2023",
    location: "BBMP Ward Office, Koramangala",
    imageUrl:
      "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&q=80",
    description: "Document submission at Ward Office",
  },
  {
    id: "2",
    date: "17 May 2023",
    location: "Property Site, HSR Layout",
    imageUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    description: "Property verification photo",
  },
];

export default CaseTrackingDashboard;
