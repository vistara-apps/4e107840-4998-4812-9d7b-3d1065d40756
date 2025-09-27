'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../../components/AppShell';
import { TemplateCard } from '../../components/TemplateCard';
import { VideoPlayer } from '../../components/VideoPlayer';
import { PrimaryButton } from '../../components/PrimaryButton';
import { InputTextArea } from '../../components/InputTextArea';
import { VIDEO_TEMPLATES } from '../../lib/constants';
import { VideoTemplate, Video } from '../../lib/types';
import { generateVideoId } from '../../lib/utils';
import { Upload, Play, Download, Share2, Palette, Type, Image } from 'lucide-react';

export default function CreatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    textLayers: [''],
    mediaUrls: [] as string[],
    brandColors: ['#ff6b6b', '#4ecdc4'],
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState<'templates' | 'customize' | 'preview'>('templates');

  useEffect(() => {
    // Check if template is pre-selected from URL
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template');
    if (templateId) {
      const template = VIDEO_TEMPLATES.find(t => t.templateId === templateId);
      if (template) {
        setSelectedTemplate(template);
        setActiveTab('customize');
        // Initialize text layers based on template
        setVideoData(prev => ({
          ...prev,
          textLayers: Array(template.textLayerCount).fill(''),
        }));
      }
    }
  }, []);

  const handleTemplateSelect = (template: VideoTemplate) => {
    setSelectedTemplate(template);
    setActiveTab('customize');
    setVideoData(prev => ({
      ...prev,
      textLayers: Array(template.textLayerCount).fill(''),
    }));
  };

  const handleTextLayerChange = (index: number, value: string) => {
    setVideoData(prev => ({
      ...prev,
      textLayers: prev.textLayers.map((layer, i) => i === index ? value : layer),
    }));
  };

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, upload files to IPFS or cloud storage
      const newUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setVideoData(prev => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...newUrls],
      }));
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    
    try {
      // Simulate video generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newVideo: Video = {
        videoId: generateVideoId(),
        userId: 'current-user',
        templateId: selectedTemplate.templateId,
        contentData: videoData,
        renderStatus: 'completed',
        videoUrl: '/generated-video.mp4',
        createdAt: new Date(),
      };
      
      setGeneratedVideo(newVideo);
      setActiveTab('preview');
    } catch (error) {
      console.error('Video generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const tabs = [
    { id: 'templates', label: 'Choose Template', icon: Palette },
    { id: 'customize', label: 'Customize', icon: Type },
    { id: 'preview', label: 'Preview', icon: Play },
  ];

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fg mb-4">Create Your Impact Video</h1>
          <p className="text-muted">
            Transform your charitable message into compelling video content
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-2 flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.id === 'customize' && !selectedTemplate;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && setActiveTab(tab.id as any)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive 
                      ? 'bg-accent text-white' 
                      : isDisabled
                      ? 'text-muted cursor-not-allowed'
                      : 'text-fg hover:bg-surface'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Template Selection */}
        {activeTab === 'templates' && (
          <div className="creator-tools">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-fg mb-2">Choose a Template</h2>
              <p className="text-muted">Select a professional template that matches your campaign style</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_TEMPLATES.map((template) => (
                <TemplateCard
                  key={template.templateId}
                  template={template}
                  variant={selectedTemplate?.templateId === template.templateId ? 'featured' : 'default'}
                  onSelect={handleTemplateSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Customization */}
        {activeTab === 'customize' && selectedTemplate && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customization Form */}
            <div className="creator-tools">
              <h2 className="text-2xl font-semibold text-fg mb-6">Customize Your Video</h2>
              
              {/* Basic Info */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-fg mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Video Content
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-fg mb-2">Video Title</label>
                    <input
                      type="text"
                      value={videoData.title}
                      onChange={(e) => setVideoData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter your video title..."
                      className="input-field w-full"
                    />
                  </div>
                  
                  <InputTextArea
                    label="Description"
                    value={videoData.description}
                    onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your charitable cause..."
                    rows={3}
                    variant="resizable"
                  />
                </div>
              </div>

              {/* Text Layers */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-fg mb-4">Text Layers</h3>
                <div className="space-y-3">
                  {videoData.textLayers.map((layer, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-fg mb-1">
                        Layer {index + 1}
                      </label>
                      <input
                        type="text"
                        value={layer}
                        onChange={(e) => handleTextLayerChange(index, e.target.value)}
                        placeholder={`Enter text for layer ${index + 1}...`}
                        className="input-field w-full"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Upload */}
              <div className="glass-card p-6 mb-6">
                <h3 className="text-lg font-semibold text-fg mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Media Assets ({videoData.mediaUrls.length}/{selectedTemplate.mediaSlots})
                </h3>
                
                <div className="space-y-4">
                  <label className="block">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent transition-colors duration-200 cursor-pointer">
                      <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                      <p className="text-muted">Click to upload images or videos</p>
                      <p className="text-xs text-muted mt-1">
                        Supports JPG, PNG, MP4, MOV files
                      </p>
                    </div>
                  </label>
                  
                  {videoData.mediaUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {videoData.mediaUrls.map((url, index) => (
                        <div key={index} className="aspect-video bg-surface rounded-lg overflow-hidden">
                          <img 
                            src={url} 
                            alt={`Media ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Colors */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-fg mb-4">Brand Colors</h3>
                <div className="flex gap-3">
                  {videoData.brandColors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...videoData.brandColors];
                          newColors[index] = e.target.value;
                          setVideoData(prev => ({ ...prev, brandColors: newColors }));
                        }}
                        className="w-12 h-12 rounded-lg border border-border cursor-pointer"
                      />
                      <span className="text-xs text-muted">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Template Preview */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-fg mb-4">Template Preview</h3>
              <div className="aspect-video bg-surface rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-muted mx-auto mb-2" />
                  <p className="text-muted">Template: {selectedTemplate.name}</p>
                </div>
              </div>
              
              <PrimaryButton
                onClick={handleGenerateVideo}
                loading={isGenerating}
                disabled={!videoData.title || videoData.textLayers.some(layer => !layer.trim())}
                className="w-full"
              >
                {isGenerating ? 'Generating Video...' : 'Generate Video'}
              </PrimaryButton>
            </div>
          </div>
        )}

        {/* Preview */}
        {activeTab === 'preview' && generatedVideo && (
          <div className="creator-tools">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-fg mb-2">Your Video is Ready!</h2>
              <p className="text-muted">Preview your generated video and share it with the world</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <VideoPlayer
                src={generatedVideo.videoUrl!}
                title={videoData.title}
                className="mb-6"
              />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton>
                  <Download className="w-4 h-4" />
                  Download Video
                </PrimaryButton>
                <PrimaryButton variant="outline">
                  <Share2 className="w-4 h-4" />
                  Share Video
                </PrimaryButton>
                <PrimaryButton variant="outline" onClick={() => setActiveTab('templates')}>
                  Create Another
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
