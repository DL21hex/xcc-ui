import { getRequestEvent } from "solid-js/web";
import { TENANTS, DEFAULT_TENANT } from "~/config/tenants";

export async function getTenantInfo()
{
	"use server";

	const event = getRequestEvent();
	const host = new URL(event!.request.url).hostname;

	return TENANTS[host] || DEFAULT_TENANT;
}