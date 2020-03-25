/*
 * Copyright (c) 2019 Myles McNamara <myles@smyl.es>
 * All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the ""License"");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an ""AS IS"" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#ifndef SMYLES_MOS_LIBS_CAPTIVE_PORTAL_WIFI_RPC_H_
#define SMYLES_MOS_LIBS_CAPTIVE_PORTAL_WIFI_RPC_H_

#include <stdbool.h>
#include <mgos.h>

#ifdef __cplusplus
extern "C"
{
#endif /* __cplusplus */

/**
 * @brief Force ESP32 Device into AP+STA Mode
 * 
 * @return true 
 */
bool mgos_captive_portal_wifi_rpc_force_apsta(void);
/**
 * Start captive portal wifi RPC handlers
 */
bool mgos_captive_portal_wifi_rpc_start(void);

#ifdef __cplusplus
}
#endif /* __cplusplus */

#endif /* SMYLES_MOS_LIBS_CAPTIVE_PORTAL_WIFI_RPC_H_ */