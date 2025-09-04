"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SettingsTab from "./settings-tab";
import SectionsTab from "./sections-tab";

export default function AdminPage() {
  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة الإدارة</h1>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="settings">الإعدادات العامة</TabsTrigger>
          <TabsTrigger value="sections">إدارة الأقسام</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SettingsTab />
        </TabsContent>

        <TabsContent value="sections">
          <SectionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
