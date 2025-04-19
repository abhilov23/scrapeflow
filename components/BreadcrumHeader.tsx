"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
 } from "./ui/breadcrumb";
import React from "react";
import { MobileSidebar } from "./Sidebar";

export default function BreadcrumHeader() {
    const pathName = usePathname();
    const paths = pathName === "/" ? [] : pathName?.split("/").filter(Boolean);
  
    return (
      <div className="flex items-center flex-start">
        <MobileSidebar />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
  
            {paths.map((path, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${path}`}>
                    {path}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    );
  }
  