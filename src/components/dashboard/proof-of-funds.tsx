"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/components/ui";
import { THRESHOLDS } from "@/constants";

interface ProofOfFundsProps {
  onGenerateProof?: (threshold: string) => Promise<boolean>;
  isLoading?: boolean;
}

export const ProofOfFunds: React.FC<ProofOfFundsProps> = ({
  onGenerateProof,
  isLoading = false,
}) => {
  const [proofs, setProofs] = useState<Record<string, boolean | null>>({
    LEVEL_1: null,
    LEVEL_2: null,
    LEVEL_3: null,
  });
  const [loadingProof, setLoadingProof] = useState<string | null>(null);

  const handleGenerateProof = async (level: string) => {
    setLoadingProof(level);
    try {
      if (onGenerateProof) {
        const result = await onGenerateProof(THRESHOLDS[level as keyof typeof THRESHOLDS].value);
        setProofs((prev) => ({ ...prev, [level]: result }));
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Error generating proof:", error);
      }
      setProofs((prev) => ({ ...prev, [level]: false }));
    } finally {
      setLoadingProof(null);
    }
  };

  const thresholdEntries = Object.entries(THRESHOLDS);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <CardTitle>Proof of Funds</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-400 mb-4">
          Prove your portfolio tier without revealing your actual balance.
        </p>

        <div className="space-y-3">
          {thresholdEntries.map(([key, threshold]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{threshold.name}</p>
                  <p className="text-xs text-slate-500">Badge: {threshold.badge}</p>
                </div>

                <div className="flex items-center gap-3">
                  {proofs[key] !== null && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {proofs[key] ? (
                          <Badge variant="success">
                            <Check className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="error">
                            <X className="w-3 h-3 mr-1" />
                            Below Threshold
                          </Badge>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  <Button
                    size="sm"
                    variant={proofs[key] === true ? "success" : "outline"}
                    isLoading={loadingProof === key}
                    onClick={() => handleGenerateProof(key)}
                    disabled={isLoading || loadingProof !== null}
                  >
                    {proofs[key] === true ? "Verified" : proofs[key] === false ? "Try Again" : "Generate"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-300">
          💡 Proof verifications are logged on-chain and visible in your activity history.
        </div>
      </CardContent>
    </Card>
  );
};
