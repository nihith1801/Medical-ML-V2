'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function BillingSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>
          Manage your billing information and view your subscription.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="rounded-lg border p-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Free Plan</h3>
            <p className="text-sm text-muted-foreground">
              You are currently on the free plan.
            </p>
          </div>
          <Button className="mt-4" variant="outline">
            Upgrade Plan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

