"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

interface AppSettings {
  currency: "USD" | "DOP"
  timezone: string
  emailNotifications: boolean
  smsNotifications: boolean
  autoAssignLeads: boolean
  requireApproval: boolean
}

export function SettingsManagement() {
  const [settings, setSettings] = useState<AppSettings>({
    currency: "USD",
    timezone: "America/Santo_Domingo",
    emailNotifications: true,
    smsNotifications: false,
    autoAssignLeads: true,
    requireApproval: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const savedSettings = localStorage.getItem("valia_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSave = async () => {
    setIsSaving(true)

    localStorage.setItem("valia_settings", JSON.stringify(settings))

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSaving(false)
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    })
  }

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-valia-ink">
                Default Currency
              </Label>
              <Select
                value={settings.currency}
                onValueChange={(value: "USD" | "DOP") => updateSetting("currency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="DOP">DOP - Dominican Peso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-valia-ink">
                Timezone
              </Label>
              <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Santo_Domingo">America/Santo_Domingo</SelectItem>
                  <SelectItem value="America/New_York">America/New_York</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                  <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-valia-ink">Email Notifications</Label>
              <p className="text-sm text-valia-muted">Receive notifications via email</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-valia-ink">SMS Notifications</Label>
              <p className="text-sm text-valia-muted">Receive notifications via SMS</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Business Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Business Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-valia-ink">Auto-assign Leads</Label>
              <p className="text-sm text-valia-muted">Automatically assign new leads to agents</p>
            </div>
            <Switch
              checked={settings.autoAssignLeads}
              onCheckedChange={(checked) => updateSetting("autoAssignLeads", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-valia-ink">Require Approval</Label>
              <p className="text-sm text-valia-muted">Require admin approval for new listings</p>
            </div>
            <Switch
              checked={settings.requireApproval}
              onCheckedChange={(checked) => updateSetting("requireApproval", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-xl text-valia-ink">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-valia-ink">
                Company Name
              </Label>
              <Input id="companyName" defaultValue="Valía Home Realty" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-valia-ink">
                Phone
              </Label>
              <Input id="phone" defaultValue="+1-809-816-6766" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-valia-ink">
                Email
              </Label>
              <Input id="email" type="email" defaultValue="info@valiahome.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-valia-ink">
                Website
              </Label>
              <Input id="website" defaultValue="www.valiahome.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-valia-ink">
              Address
            </Label>
            <Input id="address" defaultValue="Santo Domingo, Dominican Republic" />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-valia-primary hover:bg-valia-primary-600 text-white"
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
