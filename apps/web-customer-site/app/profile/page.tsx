"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Button,
  Input,
  Label,
  Badge,
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Typography,
  Progress,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components";
import {
  User,
  Calendar,
  History,
  Bell,
  Settings,
  Star,
  AlertCircle,
  Clock,
  LogOut,
  Phone,
  Mail,
} from "lucide-react";
import { MOCK_USER } from "../lib/mockData";
import { SiteHeader } from "../../components/layout/SiteHeader";
import { Footer } from "../../components/layout/Footer";

export default function ProfilePage() {
  const [setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex flex-col gap-6 container mx-auto w-full p-4">
        <Card className="bg-transparent">
          <CardContent className="w-full flex flex-row items-center justify-between p-6">
            <div className="flex gap-6 ">
              <Avatar className="w-[140px] h-[140px]">
                <AvatarImage src={MOCK_USER.avatar} />
                <AvatarFallback>
                  {MOCK_USER.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <Typography variant={"h2"}>{MOCK_USER.name}</Typography>
                <Typography
                  variant={"cardDescription"}
                  className="text-primary"
                >
                  Gold Loyalty Member
                </Typography>
                <div className="flex w-full items-center justify-between">
                  <Typography variant={"detail"}>
                    Punkty lojalnościowe
                  </Typography>
                  <Typography variant={"rating"}>1250/2000</Typography>
                </div>
                <Progress value={33} />
              </div>
            </div>
            <div className="flex flex-col gap-4 items-end justify-between">
              <div className="flex gap-2 items-center">
                <Phone size={16} />
                <Typography variant={"small"}>{MOCK_USER.phone}</Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Mail size={16} />
                <Typography variant={"small"}>{MOCK_USER.email}</Typography>
              </div>
              <Button variant={"outline"}>Edytuj profil i zgody</Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Nastepna wizyta</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <Typography variant={"h4"}>Glamour Spa</Typography>
                <Button variant={"ghost"}>
                  <Phone size={10} />
                  <Typography variant={"small"}>+ 48 111 222 333</Typography>
                </Button>
              </div>
              <Typography variant={"cardDescription"}>
                Makijaż permanentny
              </Typography>
              <div className="flex gap-2 items-center">
                <Calendar size={16} />
                <Typography variant={"small"}>22.01.2026</Typography>
                <Clock size={16} />
                <Typography variant={"small"}>12:00</Typography>
              </div>
              <div className="flex gap-2 items-center">
                <Button variant={"outline"}>Odwolaj wizytę</Button>
                <Button variant={"outline"}>Zmien termin</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-primary">Ulubione salony</CardTitle>
                <Button variant={"ghost"}>Zobacz wszystkie</Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-4 items-center">
                  <Avatar className="w-[40px] h-[40px] rounded-lg">
                    <AvatarImage src={MOCK_USER.avatar} />
                    <AvatarFallback>
                      {MOCK_USER.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant={"h4"}>Glamour Spa</Typography>
                    <Typography variant={"cardDescription"}>
                      Makijaż permanentny
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Avatar className="w-[40px] h-[40px] rounded-lg">
                    <AvatarImage src={MOCK_USER.avatar} />
                    <AvatarFallback>
                      {MOCK_USER.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant={"h4"}>Glamour Spa</Typography>
                    <Typography variant={"cardDescription"}>
                      Makijaż permanentny
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Avatar className="w-[40px] h-[40px] rounded-lg">
                    <AvatarImage src={MOCK_USER.avatar} />
                    <AvatarFallback>
                      {MOCK_USER.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography variant={"h4"}>Glamour Spa</Typography>
                    <Typography variant={"cardDescription"}>
                      Makijaż permanentny
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/80">
            <CardHeader className="flex flex-col gap-2">
              <Typography className="text-primary-foreground">
                Active Vouchers
              </Typography>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-baseline gap-2">
                <Typography variant="h1" className="text-white">
                  350
                </Typography>
                <Typography variant="h4" className="text-white">
                  PLN
                </Typography>
              </div>
              <Typography variant="small" className="text-white">
                Available across all partner salons
              </Typography>
              <Button variant="outline">
                <Typography variant="small" className="uppercase">
                  Redeem Voucher
                </Typography>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList className="bg-transparent">
                <TabsTrigger value="appointments">Wizyty</TabsTrigger>
                <TabsTrigger value="my-vouchers">Moje vouchery</TabsTrigger>
                <TabsTrigger value="my-reviews">Moje opinie</TabsTrigger>
                <TabsTrigger value="notification-settings">
                  Ustawienia powiadomien
                </TabsTrigger>
              </TabsList>
              <TabsContent value="appointments">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="my-vouchers">
                Change your password here.
              </TabsContent>
              <TabsContent value="my-reviews">
                Change your password here.
              </TabsContent>
              <TabsContent value="notification-settings">
                Change your password here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
