"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout";
import { ProofOfFunds } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useShadowVault } from "@/hooks";

export default function ProofOfFundsPage() {
  const { generateProof, proofHistory, isLoading } = useShadowVault();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Proof of Funds</h1>
          <p className="text-slate-400">Prove your portfolio tier without revealing your balance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <ProofOfFunds onGenerateProof={generateProof} isLoading={isLoading} />

          <Card>
            <CardHeader>
              <CardTitle>Proof History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {proofHistory.length > 0 ? (
                  proofHistory.map((proof) => (
                    <div key={`${proof.thresholdValue}-${proof.proofTimestamp}`} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-white">{`$${proof.thresholdValue}`}</h3>
                        <span className={`text-xs ${proof.isAboveThreshold ? "text-green-400" : "text-red-400"}`}>
                          {proof.isAboveThreshold ? "Verified" : "Below Threshold"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {new Date(proof.proofTimestamp * 1000).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-slate-400">No on-chain proof history found. Generate a proof to see your results here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
