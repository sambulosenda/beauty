"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items?: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const defaultItems: FAQItem[] = [
    {
      question: "Is BeautyBook really free?",
      answer: "Yes! BeautyBook is completely free to use. We only take a small commission on successful bookings, meaning we only make money when you make money.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No hidden charges at all. You get full access to all features including booking management, client communications, and analytics — completely free.",
    },
    {
      question: "How do you make money?",
      answer: "We take a small commission on successful bookings. Our success is directly tied to yours — we're invested in helping your business grow.",
    },
    {
      question: "What support do you offer?",
      answer: "We provide free customer support to all businesses on our platform, including setup assistance and ongoing technical support.",
    },
  ]

  const faqItems = items || defaultItems

  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-[#F5F3EB] text-[#8AB861] text-sm font-medium mb-6">
          FAQ
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600">
          Everything you need to know about our free platform.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-200 rounded-lg overflow-hidden data-[state=open]:border-[#8AB861]/50"
          >
            <AccordionTrigger className="AccordionTrigger--no-icon flex justify-between items-center w-full px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors duration-150">
              <span>{item.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-gray-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
