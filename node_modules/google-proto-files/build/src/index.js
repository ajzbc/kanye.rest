"use strict";
/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const loader = require("./load");
function getProtoPath(...paths) {
    return path.join(__dirname, '../../', 'google', ...paths);
}
exports.getProtoPath = getProtoPath;
exports.load = loader.load;
exports.loadSync = loader.loadSync;
exports.appengine = {
    v1: getProtoPath('appengine/v1/appengine.proto'),
};
exports.bigtable = {
    v1: getProtoPath('bigtable/v1/bigtable_service.proto'),
    v2: getProtoPath('bigtable/v2/bigtable.proto'),
    admin: {
        v1: getProtoPath('bigtable/admin/table/v1/bigtable_table_service.proto'),
        v2: {
            instance: getProtoPath('bigtable/admin/v2/bigtable_instance_admin.proto'),
            table: getProtoPath('bigtable/admin/v2/bigtable_table_admin.proto'),
        },
    }
};
exports.cloudtrace = {
    v1: getProtoPath('devtools/cloudtrace/v1/trace.proto'),
};
exports.container = {
    v1: getProtoPath('container/v1/cluster_service.proto'),
};
exports.datastore = {
    v1: getProtoPath('datastore/v1/datastore.proto'),
    v1beta3: getProtoPath('datastore/v1beta3/datastore.proto'),
};
exports.dlp = {
    v2beta1: getProtoPath('privacy/dlp/v2beta1/dlp.proto'),
};
exports.embeddedAssistant = {
    v1alpha1: getProtoPath('assistant/embedded/v1alpha1/embedded_assistant.proto'),
    v1alpha2: getProtoPath('assistant/embedded/v1alpha2/embedded_assistant.proto'),
};
exports.firestore = {
    v1beta1: getProtoPath('firestore/v1beta1/firestore.proto'),
    admin: {
        v1beta1: getProtoPath('firestore/admin/v1beta1/firestore_admin.proto'),
    }
};
exports.functions = {
    v1beta2: getProtoPath('cloud/functions/v1beta2/functions.proto'),
};
exports.iam = {
    v1: getProtoPath('iam/v1/iam_policy.proto'),
    admin: {
        v1: getProtoPath('iam/admin/v1/iam.proto'),
    }
};
exports.language = {
    v1beta1: getProtoPath('cloud/language/v1beta1/language_service.proto'),
    v1: getProtoPath('cloud/language/v1/language_service.proto'),
};
exports.logging = {
    v2: getProtoPath('logging/v2/logging.proto'),
};
exports.monitoring = {
    v3: {
        group: getProtoPath('monitoring/v3/group_service.proto'),
        metric: getProtoPath('monitoring/v3/metric_service.proto'),
    },
};
exports.pubsub = {
    v1: getProtoPath('pubsub/v1/pubsub.proto'),
    v1beta2: getProtoPath('pubsub/v1beta2/pubsub.proto'),
};
exports.spanner = {
    v1: getProtoPath('spanner/v1/spanner.proto'),
    admin: {
        v1: {
            database: getProtoPath('spanner/admin/database/v1/spanner_database_admin.proto'),
            instance: getProtoPath('spanner/admin/instance/v1/spanner_instance_admin.proto'),
        },
    }
};
exports.speech = {
    v1beta1: getProtoPath('cloud/speech/v1beta1/cloud_speech.proto'),
    v1: getProtoPath('cloud/speech/v1/cloud_speech.proto'),
    v2: getProtoPath('cloud/speech/v2/cloud_speech.proto'),
};
exports.storagetransfer = {
    v1: getProtoPath('storagetransfer/v1/transfer.proto'),
};
exports.videointelligence = {
    v1beta1: getProtoPath('cloud/videointelligence/v1beta1/video_intelligence.proto'),
};
exports.vision = {
    v1: getProtoPath('cloud/vision/v1/image_annotator.proto'),
};
//# sourceMappingURL=index.js.map