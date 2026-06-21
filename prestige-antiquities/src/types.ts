export interface Artifact {
  id: string;
  title: string;
  category: 'sculpture' | 'pottery' | 'bronze' | 'coin' | 'jewelry' | 'glass';
  culture: string;
  date: string;
  material: string;
  dimensions: string;
  provenance: string;
  description: string;
  imageUrl: string;
  rarity: 'Exceptionnel' | 'Rare' | 'Très Rare' | 'Unique';
  exhibited?: string;
  acquisitionDate?: string;
  subCategory?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}

export interface InquiryFormState {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  artifactId?: string;
  preferredContact: 'email' | 'phone';
}
