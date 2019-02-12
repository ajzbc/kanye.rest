/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */
import * as loader from './load';
export declare function getProtoPath(...paths: string[]): string;
export declare const load: typeof loader.load;
export declare const loadSync: typeof loader.loadSync;
export declare const appengine: {
    v1: string;
};
export declare const bigtable: {
    v1: string;
    v2: string;
    admin: {
        v1: string;
        v2: {
            instance: string;
            table: string;
        };
    };
};
export declare const cloudtrace: {
    v1: string;
};
export declare const container: {
    v1: string;
};
export declare const datastore: {
    v1: string;
    v1beta3: string;
};
export declare const dlp: {
    v2beta1: string;
};
export declare const embeddedAssistant: {
    v1alpha1: string;
    v1alpha2: string;
};
export declare const firestore: {
    v1beta1: string;
    admin: {
        v1beta1: string;
    };
};
export declare const functions: {
    v1beta2: string;
};
export declare const iam: {
    v1: string;
    admin: {
        v1: string;
    };
};
export declare const language: {
    v1beta1: string;
    v1: string;
};
export declare const logging: {
    v2: string;
};
export declare const monitoring: {
    v3: {
        group: string;
        metric: string;
    };
};
export declare const pubsub: {
    v1: string;
    v1beta2: string;
};
export declare const spanner: {
    v1: string;
    admin: {
        v1: {
            database: string;
            instance: string;
        };
    };
};
export declare const speech: {
    v1beta1: string;
    v1: string;
    v2: string;
};
export declare const storagetransfer: {
    v1: string;
};
export declare const videointelligence: {
    v1beta1: string;
};
export declare const vision: {
    v1: string;
};
