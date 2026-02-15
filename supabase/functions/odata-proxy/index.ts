import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ODATA_BASE = "https://sap-ux-mock-services-v4-lrop-custom-base-uri.cfapps.us10.hana.ondemand.com/catalog-admin-noauth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, OData-Version, OData-MaxVersion, If-Match, If-None-Match, Prefer, X-CSRF-Token",
  "Access-Control-Expose-Headers": "OData-Version, ETag, Location, Preference-Applied",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathAfterFunction = url.pathname.replace(/^\/odata-proxy\/?/, "");
    const targetUrl = `${ODATA_BASE}/${pathAfterFunction}${url.search}`;

    const headers = new Headers();
    for (const [key, value] of req.headers.entries()) {
      if (key.toLowerCase() !== "host" && key.toLowerCase() !== "origin") {
        headers.set(key, value);
      }
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
    });

    const responseHeaders = new Headers(response.headers);
    for (const [key, value] of Object.entries(corsHeaders)) {
      responseHeaders.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
