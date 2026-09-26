export type CueStatus = 'draft' | 'ready' | 'confirmed';
export type UserRole = 'designer' | 'programmer' | 'stage-manager' | 'readonly';
export type ConflictSeverity = 'error' | 'warning';

export interface Cue {
  id: string;
  number: string;
  label: string;
  position: string;
  channel: string;
  color: string;
  colorHex: string;
  brightness: number;
  fadeIn: number;
  hold: number;
  fadeOut: number;
  followCueId: string;
  targetNote: string;
  notes: string;
  status: CueStatus;
  /** 现场登记的顺延秒数：仅作用于本提示，跟随它的下游提示会连带后移。 */
  delaySeconds?: number;
  startTime?: number;
  duration?: number;
  endTime?: number;
  /** 现场时间轴：计划开始时间叠加自身与跟随链上游的顺延后得出。 */
  liveStartTime?: number;
  liveEndTime?: number;
  liveShift?: number;
}

export interface Scene {
  id: string;
  name: string;
  order: number;
  frozen: boolean;
  startTime?: number;
  duration?: number;
  endTime?: number;
  liveStartTime?: number;
  liveDuration?: number;
  liveEndTime?: number;
  liveShift?: number;
  cues: Cue[];
}

export interface LightingPlan {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  scenes: Scene[];
}

export interface CueConflict {
  id: string;
  planId: string;
  cueId: string;
  sceneId: string;
  severity: ConflictSeverity;
  type:
    | 'channel-overlap'
    | 'live-channel-overlap'
    | 'follow-order'
    | 'live-follow-order'
    | 'missing-data'
    | 'duplicate-position'
    | 'duration';
  message: string;
}

export interface Workspace {
  plans: LightingPlan[];
  activePlanId: string;
  comparePlanId: string;
  selectedSceneId: string;
  selectedCueId: string;
  role: UserRole;
}

export interface EditorState {
  workspace: Workspace;
  past: Workspace[];
  future: Workspace[];
  lastAction: string;
}

export interface PersistedState {
  workspace: Workspace;
}
