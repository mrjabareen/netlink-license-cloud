'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  CreditCard,
  Key,
  Lock,
  Monitor,
  Package,
  Rocket,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Key,
    title: 'License Management',
    description: 'Issue, activate, and manage software licenses with ease',
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Ed25519 signing, Argon2id hashing, and JWT authentication',
  },
  {
    icon: Cloud,
    title: 'Cloud-Native',
    description: 'Built for scalability with Docker, Kubernetes support',
  },
  {
    icon: CreditCard,
    title: 'Payment Integration',
    description: 'Stripe, PayPal, Paddle, and more payment gateways',
  },
  {
    icon: Code2,
    title: 'Developer SDKs',
    description: 'Ready-to-use SDKs for JavaScript, PHP, C#, and more',
  },
  {
    icon: Monitor,
    title: 'Real-time Analytics',
    description: 'Track activations, usage, and revenue in real-time',
  },
];

const benefits = [
  'Unlimited Products & Plans',
  'Offline License Validation',
  'Multi-device Activation',
  'Automatic Updates',
  'Webhook Integration',
  'API Documentation',
  'Role-Based Access',
  '24/7 Support',
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">NetLink License Cloud</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/docs">
                <Button variant="ghost">Documentation</Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-5xl text-center"
          >
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="mr-1 h-3 w-3" />
              Enterprise-Ready Licensing Platform
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Complete{' '}
              <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                License Management
              </span>
              <br />
              for Modern Software
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Issue licenses, manage activations, process payments, and deliver updates.
              <br />
              Everything you need to monetize your software products.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Live Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to manage your software licensing business
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden p-6 hover:shadow-lg transition-shadow">
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 transition-transform group-hover:scale-110" />
                  <feature.icon className="mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Why Choose NetLink?
              </h2>
              <p className="text-lg text-muted-foreground">
                Built for developers, trusted by businesses worldwide
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="rounded-full bg-primary/10 p-1">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Active Licenses', value: '10M+', icon: Key },
              { label: 'API Requests/Day', value: '500M+', icon: Zap },
              { label: 'Happy Customers', value: '50K+', icon: Users },
              { label: 'Uptime SLA', value: '99.99%', icon: Lock },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of companies managing their software licenses with NetLink
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary sm:w-auto"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-primary p-2">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">NetLink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise licensing platform for modern software businesses.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-muted-foreground hover:text-foreground">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-muted-foreground hover:text-foreground">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NetLink Technology Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
