import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export interface LeadModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  leadName: string;
  setLeadName: (v: string) => void;
  leadEmail: string;
  setLeadEmail: (v: string) => void;
  leadPhone: string;
  setLeadPhone: (v: string) => void;
  leadLocation: string;
  setLeadLocation: (v: string) => void;
  leadMessage: string;
  setLeadMessage: (v: string) => void;
  title?: string;
  description?: string;
  showMessageField?: boolean;
  isLoading?: boolean;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  open,
  onOpenChange,
  onSubmit,
  leadName,
  setLeadName,
  leadEmail,
  setLeadEmail,
  leadPhone,
  setLeadPhone,
  leadLocation,
  setLeadLocation,
  leadMessage,
  setLeadMessage,
  title = "Request a Tour",
  description = "Share your contact details and agent will reach out shortly.",
  showMessageField = true,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name *</Label>
            <Input 
              id="lead-name" 
              value={leadName} 
              onChange={(e) => setLeadName(e.target.value)} 
              placeholder="Your name" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email *</Label>
            <Input 
              id="lead-email" 
              type="email" 
              value={leadEmail} 
              onChange={(e) => setLeadEmail(e.target.value)} 
              placeholder="you@example.com" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone</Label>
            <Input 
              id="lead-phone" 
              value={leadPhone} 
              onChange={(e) => setLeadPhone(e.target.value)} 
              placeholder="+1 555-123-4567" 
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-location">Location</Label>
            <Input 
              id="lead-location" 
              value={leadLocation} 
              onChange={(e) => setLeadLocation(e.target.value)} 
              placeholder="City, Country" 
              disabled={isLoading}
            />
          </div>
          {showMessageField && (
            <div className="space-y-2">
              <Label htmlFor="lead-message">Message</Label>
              <Textarea 
                id="lead-message" 
                value={leadMessage} 
                onChange={(e) => setLeadMessage(e.target.value)} 
                placeholder="Tell us more about your inquiry..." 
                rows={3}
                disabled={isLoading}
              />
            </div>
          )}
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadModal;


