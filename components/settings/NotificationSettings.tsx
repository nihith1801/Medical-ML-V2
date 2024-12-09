'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose what notifications you want to receive.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications">Email Notifications</Label>
          <Switch id="email-notifications" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="marketing-emails">Marketing Emails</Label>
          <Switch id="marketing-emails" />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="security-alerts">Security Alerts</Label>
          <Switch id="security-alerts" defaultChecked />
        </div>
      </CardContent>
    </Card>
  )
}

