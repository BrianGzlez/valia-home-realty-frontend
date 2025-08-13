"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react"

interface MortgageCalculatorProps {
  propertyPrice?: number
  className?: string
}

export function MortgageCalculator({ propertyPrice = 0, className = "" }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(propertyPrice)
  const [downPayment, setDownPayment] = useState(20)
  const [interestRate, setInterestRate] = useState(7.5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    if (price > 0) {
      const principal = price - (price * downPayment) / 100
      const monthlyRate = interestRate / 100 / 12
      const numPayments = loanTerm * 12

      if (monthlyRate > 0) {
        const monthly =
          (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
          (Math.pow(1 + monthlyRate, numPayments) - 1)
        const total = monthly * numPayments
        const interest = total - principal

        setMonthlyPayment(monthly)
        setTotalInterest(interest)
      }
    }
  }, [price, downPayment, interestRate, loanTerm])

  return (
    <Card className={`bg-valia-surface border-valia-border ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-valia-ink">
          <Calculator className="h-5 w-5 text-valia-primary" />
          Calculadora de Hipoteca
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price" className="text-valia-ink flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Precio de la Propiedad
            </Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="border-valia-border focus:border-valia-primary"
              placeholder="500000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment" className="text-valia-ink flex items-center gap-1">
              <Percent className="h-4 w-4" />
              Enganche (%)
            </Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="border-valia-border focus:border-valia-primary"
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate" className="text-valia-ink flex items-center gap-1">
              <Percent className="h-4 w-4" />
              Tasa de Interés (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="border-valia-border focus:border-valia-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-valia-ink flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Plazo (años)
            </Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="border-valia-border focus:border-valia-primary"
              min="1"
              max="40"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-valia-bg rounded-lg border border-valia-border">
          <h4 className="font-semibold text-valia-ink mb-3">Resultados del Cálculo</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-valia-muted">Pago Mensual</p>
              <p className="text-2xl font-bold text-valia-primary">
                ${monthlyPayment.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-valia-muted">Enganche</p>
              <p className="text-xl font-semibold text-valia-ink">
                ${((price * downPayment) / 100).toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-valia-muted">Interés Total</p>
              <p className="text-xl font-semibold text-valia-danger">
                ${totalInterest.toLocaleString("es-MX", { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
