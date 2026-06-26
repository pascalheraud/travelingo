import type { ReportPayload } from '@/models';

// Phase 1 has no backend yet — this is a local stand-in until reports have
// somewhere real to go (see doc/travelingo-plan-phase1-status.md Sprint 6).
export class ReportService {
  async submitReport(payload: ReportPayload): Promise<void> {
    console.info('[ReportService] report submitted (stand-in, not sent anywhere yet)', payload);
  }
}
