"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Award, User, BookOpen, Hash, Shield, FileText, CheckCircle, Loader2, Sparkles, Zap } from "lucide-react"

interface Student {
  id: string
  name: string
  universityId: string
  walletAddress: string
  eligibilityStatus: "graduated" | "eligible" | "pending_review" | "not_eligible"
  mintingStatus: "none" | "pending" | "minting" | "minted" | "failed"
  joinDate: string
  lastActivity: string
}

interface University {
  id: string
  name: string
  logo: string
  banner: string
  description: string
  website: string
  walletAddress: string
  verified: boolean
  adminName: string
  adminRole: string
}

interface MintCredentialModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (credentialData: any) => void
  student: Student | null
  university: University | null
}

interface CredentialFormData {
  name: string
  description: string
  image: string
  external_url: string
  credentialType: string
  major: string
  gpa: string
  issueDate: string
  graduationDate: string
  credentialId: string
  verificationUrl: string
  accreditationBody: string
  programDetails: string
  animation_url: string
  youtube_url: string
  background_color: string
}

export default function MintCredentialModal({
  isOpen,
  onClose,
  onSubmit,
  student,
  university,
}: MintCredentialModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CredentialFormData>({
    name: "",
    description: "",
    image: "",
    external_url: "",
    credentialType: "",
    major: "",
    gpa: "",
    issueDate: new Date().toISOString().split("T")[0],
    graduationDate: new Date().toISOString().split("T")[0],
    credentialId: "",
    verificationUrl: "",
    accreditationBody: "",
    programDetails: "",
    animation_url: "",
    youtube_url: "",
    background_color: "FFFFFF",
  })

  // Initialize form with default values when modal opens
  useEffect(() => {
    if (isOpen && student && university) {
      const credentialId = `${university.id.toUpperCase()}-${Date.now()}-${student.id}`
      setFormData({
        name: "BTECH",
        description: `Official academic credential awarded by ${university.name} for the successful completion of the Bachelor of Science program.`,
        image: "ipfs://QmYourUniversityLogoHash/university_logo.png",
        external_url: "ipfs://QmYourCredentialDetailsHash/program_details.pdf",
        credentialType: "Bachelor's Degree",
        major: "Computer Science",
        gpa: "3.85",
        issueDate: new Date().toISOString().split("T")[0],
        graduationDate: new Date().toISOString().split("T")[0],
        credentialId: credentialId,
        verificationUrl: `https://vericred.com/verify?credentialId=${credentialId}`,
        accreditationBody: "Accreditation Council for Education (ACE)",
        programDetails: "ipfs://QmProgramDetailsHash/curriculum.json",
        animation_url: "",
        youtube_url: "",
        background_color: "FFFFFF",
      })
    }
  }, [isOpen, student, university])

  const handleInputChange = (field: keyof CredentialFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!student || !university) return

    setIsSubmitting(true)

    // Build the credential data structure
    const credentialData = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      external_url: formData.external_url,
      attributes: [
        { trait_type: "Credential Type", value: formData.credentialType },
        { trait_type: "Issuing Institution", value: university.name },
        { trait_type: "Issuer Wallet", value: university.walletAddress },
        { trait_type: "Recipient Name", value: student.name },
        { trait_type: "Recipient Wallet", value: student.walletAddress },
        { trait_type: "Issue Date", value: formData.issueDate },
        { trait_type: "Graduation Date", value: formData.graduationDate },
        { trait_type: "Major", value: formData.major },
        { trait_type: "GPA", value: formData.gpa },
        { trait_type: "Credential ID", value: formData.credentialId },
        { trait_type: "Status", value: "Active" },
        { trait_type: "Verification URL", value: formData.verificationUrl },
        { trait_type: "Accreditation Body", value: formData.accreditationBody },
        { trait_type: "Program Details", value: formData.programDetails },
      ],
      animation_url: formData.animation_url || null,
      youtube_url: formData.youtube_url || null,
      background_color: formData.background_color,
    }

    // Simulate API delay
    setTimeout(() => {
      onSubmit(credentialData)
      setIsSubmitting(false)
    }, 2000)
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-800">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="h-6 w-6 text-black" />
                </motion.div>
                <div>
                  <motion.h2
                    className="text-2xl font-bold text-white flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Mint New Credential
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                  </motion.h2>
                  <motion.p
                    className="text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Create and mint a new NFT credential for {student?.name}
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Student Info */}
            {student && (
              <motion.div
                className="mt-4 p-4 bg-black/20 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{student.name}</p>
                    <p className="text-sm text-gray-400">ID: {student.universityId}</p>
                  </div>
                  <div className="ml-auto">
                    <Badge className="bg-green-900/30 text-green-300 border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Eligible
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="academic"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Academic
                </TabsTrigger>
                <TabsTrigger
                  value="metadata"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  <Hash className="h-4 w-4 mr-2" />
                  Metadata
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6">
                <motion.div variants={tabContentVariants} initial="hidden" animate="visible" className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name" className="text-gray-300">
                            Credential Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="e.g., BTECH, MBA, PhD"
                          />
                        </div>
                        <div>
                          <Label htmlFor="credentialType" className="text-gray-300">
                            Credential Type *
                          </Label>
                          <Input
                            id="credentialType"
                            value={formData.credentialType}
                            onChange={(e) => handleInputChange("credentialType", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="e.g., Bachelor's Degree"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description" className="text-gray-300">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          rows={3}
                          placeholder="Detailed description of the credential..."
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="image" className="text-gray-300">
                            Image URL (IPFS)
                          </Label>
                          <Input
                            id="image"
                            value={formData.image}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="ipfs://QmYourImageHash/image.png"
                          />
                        </div>
                        <div>
                          <Label htmlFor="external_url" className="text-gray-300">
                            External URL (IPFS)
                          </Label>
                          <Input
                            id="external_url"
                            value={formData.external_url}
                            onChange={(e) => handleInputChange("external_url", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="ipfs://QmYourDetailsHash/details.pdf"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="academic" className="mt-6">
                <motion.div variants={tabContentVariants} initial="hidden" animate="visible" className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Academic Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="major" className="text-gray-300">
                            Major/Field of Study *
                          </Label>
                          <Input
                            id="major"
                            value={formData.major}
                            onChange={(e) => handleInputChange("major", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="e.g., Computer Science"
                          />
                        </div>
                        <div>
                          <Label htmlFor="gpa" className="text-gray-300">
                            GPA/Grade
                          </Label>
                          <Input
                            id="gpa"
                            value={formData.gpa}
                            onChange={(e) => handleInputChange("gpa", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="e.g., 3.85"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="issueDate" className="text-gray-300">
                            Issue Date *
                          </Label>
                          <Input
                            id="issueDate"
                            type="date"
                            value={formData.issueDate}
                            onChange={(e) => handleInputChange("issueDate", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="graduationDate" className="text-gray-300">
                            Graduation Date *
                          </Label>
                          <Input
                            id="graduationDate"
                            type="date"
                            value={formData.graduationDate}
                            onChange={(e) => handleInputChange("graduationDate", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="accreditationBody" className="text-gray-300">
                          Accreditation Body
                        </Label>
                        <Input
                          id="accreditationBody"
                          value={formData.accreditationBody}
                          onChange={(e) => handleInputChange("accreditationBody", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          placeholder="e.g., Accreditation Council for Education (ACE)"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="metadata" className="mt-6">
                <motion.div variants={tabContentVariants} initial="hidden" animate="visible" className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Hash className="h-5 w-5" />
                        Metadata & URLs
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="credentialId" className="text-gray-300">
                          Credential ID *
                        </Label>
                        <Input
                          id="credentialId"
                          value={formData.credentialId}
                          onChange={(e) => handleInputChange("credentialId", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500 font-mono"
                          placeholder="Auto-generated unique ID"
                        />
                      </div>
                      <div>
                        <Label htmlFor="verificationUrl" className="text-gray-300">
                          Verification URL
                        </Label>
                        <Input
                          id="verificationUrl"
                          value={formData.verificationUrl}
                          onChange={(e) => handleInputChange("verificationUrl", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          placeholder="https://vericred.com/verify?credentialId=..."
                        />
                      </div>
                      <div>
                        <Label htmlFor="programDetails" className="text-gray-300">
                          Program Details (IPFS)
                        </Label>
                        <Input
                          id="programDetails"
                          value={formData.programDetails}
                          onChange={(e) => handleInputChange("programDetails", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                          placeholder="ipfs://QmProgramDetailsHash/curriculum.json"
                        />
                      </div>
                      <Separator className="bg-gray-700" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="animation_url" className="text-gray-300">
                            Animation URL (Optional)
                          </Label>
                          <Input
                            id="animation_url"
                            value={formData.animation_url}
                            onChange={(e) => handleInputChange("animation_url", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="ipfs://QmAnimationHash/animation.mp4"
                          />
                        </div>
                        <div>
                          <Label htmlFor="youtube_url" className="text-gray-300">
                            YouTube URL (Optional)
                          </Label>
                          <Input
                            id="youtube_url"
                            value={formData.youtube_url}
                            onChange={(e) => handleInputChange("youtube_url", e.target.value)}
                            className="bg-gray-900 border-gray-600 text-white focus:border-gray-500"
                            placeholder="https://youtube.com/watch?v=..."
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="background_color" className="text-gray-300">
                          Background Color (Hex)
                        </Label>
                        <Input
                          id="background_color"
                          value={formData.background_color}
                          onChange={(e) => handleInputChange("background_color", e.target.value)}
                          className="bg-gray-900 border-gray-600 text-white focus:border-gray-500 font-mono"
                          placeholder="FFFFFF"
                          maxLength={6}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="preview" className="mt-6">
                <motion.div variants={tabContentVariants} initial="hidden" animate="visible" className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Credential Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-900 rounded-lg p-6 border border-gray-600">
                        <div className="text-center mb-6">
                          <motion.div
                            className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Award className="h-10 w-10 text-black" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-white mb-2">{formData.name || "Credential Name"}</h3>
                          <p className="text-gray-400 text-sm">{formData.description || "Credential description"}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Type:</span>
                              <span className="text-white">{formData.credentialType || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Major:</span>
                              <span className="text-white">{formData.major || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">GPA:</span>
                              <span className="text-white">{formData.gpa || "N/A"}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Issue Date:</span>
                              <span className="text-white">{formData.issueDate || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Graduation:</span>
                              <span className="text-white">{formData.graduationDate || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Status:</span>
                              <Badge className="bg-green-900/30 text-green-300 border-green-800 text-xs">Active</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <p>Minting to: {student?.walletAddress}</p>
                <p>Gas fees will be covered by university wallet</p>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.name || !formData.description}
                    className="bg-white text-black hover:bg-gray-100 font-semibold min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <motion.div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Loader2 className="h-4 w-4" />
                        </motion.div>
                        Minting...
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Mint NFT
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
