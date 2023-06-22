
export class VideoSizzle {
    constructor( public VideoSizzleId: string='',
        public VideoURL: string='',
        public VideoFormat: string='') { }

}
export class GetVideoProfile {
    constructor(  
        public VideoProfile: string='',
        public VideoSizzle: string='') { }

}