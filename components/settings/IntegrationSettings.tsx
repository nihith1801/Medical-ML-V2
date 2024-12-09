'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const integrations = [
  {
    name: 'GitHub',
    description: 'Connect your GitHub account to sync your repositories.',
    connected: false,
  },
  {
    name: 'Google',
    description: 'Connect your Google account for seamless sign-in.',
    connected: true,
  },
  // Add more integrations as needed
]

export function IntegrationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your connected accounts and services.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between p-4 rounded-lg border"
          >
            <div>
              <h3 className="font-semibold">{integration.name}</h3>
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
            </div>
            <Button variant={integration.connected ? "destructive" : "outline"}>
              {integration.connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

