import { motion } from "framer-motion"

interface LogoProps {
	size?: "sm" | "md" | "lg"
	showText?: boolean
	className?: string
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-10 h-10",
		lg: "w-14 h-14",
	}

	const textSizes = {
		sm: "text-lg",
		md: "text-2xl",
		lg: "text-3xl",
	}

	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<motion.div
				className={`${sizeClasses[size]} flex items-center justify-center drop-shadow-[0_0_12px_rgba(168,85,247,0.35)]`}
				whileHover={{ scale: 1.06, rotate: 3 }}
				transition={{ duration: 0.2 }}
				aria-label="VeriCred logo"
			>
				<svg
					width="400"
					height="400"
					viewBox="0 0 400 400"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="xMidYMid meet"
				>
					<defs>
						{/* Gradient definitions for different faces */}
						<linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#ff00ff" stopOpacity="1" />
							<stop offset="25%" stopColor="#da70d6" stopOpacity="1" />
							<stop offset="50%" stopColor="#8a2be2" stopOpacity="1" />
							<stop offset="75%" stopColor="#6a0dad" stopOpacity="1" />
							<stop offset="100%" stopColor="#4b0082" stopOpacity="1" />
						</linearGradient>
						
						<linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#9932cc" stopOpacity="1" />
							<stop offset="30%" stopColor="#7b68ee" stopOpacity="1" />
							<stop offset="60%" stopColor="#6a0dad" stopOpacity="1" />
							<stop offset="100%" stopColor="#2d1b69" stopOpacity="1" />
						</linearGradient>
						
						<linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#e6e6fa" stopOpacity="1" />
							<stop offset="20%" stopColor="#da70d6" stopOpacity="1" />
							<stop offset="50%" stopColor="#ba55d3" stopOpacity="1" />
							<stop offset="80%" stopColor="#9370db" stopOpacity="1" />
							<stop offset="100%" stopColor="#663399" stopOpacity="1" />
						</linearGradient>
						
						{/* Neon glow effect */}
						<filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
							<feGaussianBlur stdDeviation="5" result="coloredBlur"/>
							<feMerge> 
								<feMergeNode in="coloredBlur"/>
								<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
						
						{/* Edge glow */}
						<filter id="edgeGlow" x="-100%" y="-100%" width="300%" height="300%">
							<feGaussianBlur stdDeviation="3" result="blur"/>
							<feColorMatrix in="blur" type="matrix" values="1.5 0 1.5 0 0  0 0.5 1.5 0 0  1.5 0 1.5 0 0  0 0 0 1 0"/>
							<feMerge>
								<feMergeNode in="blur"/>
								<feMergeNode in="SourceGraphic"/>
							</feMerge>
						</filter>
					</defs>
					
					{/* Centered isometric cube */}
					<g transform="translate(200,260)">
						
						{/* Top face */}
						<polygon points="-100,-125 0,-175 100,-125 0,-75" 
								 fill="url(#topGrad)" 
								 stroke="#ff00ff" 
								 strokeWidth="4" 
								 filter="url(#neon)"/>
						
						{/* Left face */}
						<polygon points="-100,-125 -100,0 0,50 0,-75" 
								 fill="url(#leftGrad)" 
								 stroke="#8a2be2" 
								 strokeWidth="4"/>
						
						{/* Right face */}
						<polygon points="0,-75 0,50 100,0 100,-125" 
								 fill="url(#rightGrad)" 
								 stroke="#da70d6" 
								 strokeWidth="4" 
								 filter="url(#neon)"/>
						
						{/* Enhanced edge highlights */}
						<g strokeWidth="3" fill="none" filter="url(#edgeGlow)" opacity="0.8">
							<line x1="-100" y1="-125" x2="0" y2="-175" stroke="#ff00ff"/>
							<line x1="0" y1="-175" x2="100" y2="-125" stroke="#ff00ff"/>
							<line x1="100" y1="-125" x2="100" y2="0" stroke="#da70d6"/>
							<line x1="0" y1="50" x2="100" y2="0" stroke="#da70d6"/>
							<line x1="-100" y1="0" x2="0" y2="50" stroke="#8a2be2"/>
							<line x1="-100" y1="-125" x2="-100" y2="0" stroke="#9932cc"/>
							<line x1="0" y1="-75" x2="0" y2="50" stroke="#ba55d3"/>
						</g>
						
						{/* Inner highlight lines for extra dimension */}
						<g strokeWidth="2" fill="none" opacity="0.6">
							<line x1="-50" y1="-100" x2="0" y2="-125" stroke="#ff69b4"/>
							<line x1="0" y1="-125" x2="50" y2="-100" stroke="#ff69b4"/>
							<line x1="50" y1="-100" x2="50" y2="-25" stroke="#dda0dd"/>
							<line x1="0" y1="25" x2="50" y2="-25" stroke="#dda0dd"/>
							<line x1="-50" y1="-25" x2="0" y2="25" stroke="#9370db"/>
							<line x1="-50" y1="-100" x2="-50" y2="-25" stroke="#8b008b"/>
						</g>
						
					</g>
					
				</svg>
			</motion.div>
			{showText && (
				<div className={`font-bold tracking-tight ${textSizes[size]}`}>
					Veri<span className="text-purple-400">Cred</span>
				</div>
			)}
		</div>
	)
} 